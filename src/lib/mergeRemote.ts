import type { CaseStudy } from "../data/caseStudies";
import type { Service } from "../data/services";
import { replaceRetiredProductNames } from "../data/naming";

export function normalizeTitle(value: string | null | undefined): string {
  return (value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function caseStudyTitleKey(title: string | null | undefined): string {
  if (!title?.trim()) return "";
  return normalizeTitle(replaceRetiredProductNames(title));
}

function isVacantRemoteValue(value: unknown): boolean {
  return value == null || (Array.isArray(value) && value.length === 0);
}

/** Copy remote fields onto local, skipping null, undefined, and empty arrays. */
export function overlayRemote<T extends object>(local: T, remote: object): T {
  const next = { ...local } as T;
  const record = next as Record<string, unknown>;
  for (const [key, value] of Object.entries(remote)) {
    if (isVacantRemoteValue(value)) continue;
    record[key] = value;
  }
  return next;
}

export function findLocalCaseStudy(
  studies: readonly CaseStudy[],
  slug: string | undefined,
  remoteTitle: string | null | undefined,
): CaseStudy | undefined {
  const bySlug = slug ? studies.find((item) => item.slug === slug) : undefined;
  if (bySlug) return bySlug;
  const remoteKey = caseStudyTitleKey(remoteTitle);
  if (!remoteKey) return undefined;
  return studies.find((item) => caseStudyTitleKey(item.title) === remoteKey);
}

export function mergeCaseStudies(
  localStudies: readonly CaseStudy[],
  remoteStudies: readonly CaseStudy[],
): CaseStudy[] {
  const claimed = new Set<number>();
  const paired: { local: CaseStudy; remote?: CaseStudy }[] = localStudies.map((local) => ({
    local,
  }));

  localStudies.forEach((local, localIndex) => {
    const index = remoteStudies.findIndex(
      (remote, remoteIndex) =>
        !claimed.has(remoteIndex) && Boolean(remote.slug) && remote.slug === local.slug,
    );
    if (index === -1) return;
    claimed.add(index);
    paired[localIndex].remote = remoteStudies[index];
  });

  localStudies.forEach((local, localIndex) => {
    if (paired[localIndex].remote) return;
    const localKey = caseStudyTitleKey(local.title);
    if (!localKey) return;
    const index = remoteStudies.findIndex((remote, remoteIndex) => {
      if (claimed.has(remoteIndex)) return false;
      const remoteKey = caseStudyTitleKey(remote.title);
      return remoteKey !== "" && remoteKey === localKey;
    });
    if (index === -1) return;
    claimed.add(index);
    paired[localIndex].remote = remoteStudies[index];
  });

  const merged = paired.map(({ local, remote }) => {
    if (!remote) return { ...local };
    return {
      ...overlayRemote(local, remote),
      title: replaceRetiredProductNames(remote.title || local.title),
      displayId: remote.displayId || local.displayId,
      evidenceBasis: remote.evidenceBasis || local.evidenceBasis,
    };
  });

  const remoteOnly = remoteStudies
    .filter((_, index) => !claimed.has(index))
    .map((remote) => ({
      ...remote,
      title: replaceRetiredProductNames(remote.title),
    }));

  return [...merged, ...remoteOnly];
}

export function mergeServices(
  localServices: readonly Service[],
  remoteServices: readonly Service[],
): Service[] {
  return localServices.map((local) => {
    const remote = remoteServices.find((item) => item.id === local.id);
    if (!remote) return { ...local };
    return {
      ...overlayRemote(local, remote),
      featured: remote.featured ?? local.featured,
      learnMoreTo: remote.learnMoreTo ?? local.learnMoreTo,
    };
  });
}
