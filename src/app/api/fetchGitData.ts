/**
 * Contains a function to get User Data from Github and return a data object
 */

import { request } from "@octokit/request";
import { createUnauthenticatedAuth } from "@octokit/auth-unauthenticated";

const username: string = "andrewpking";

interface RepoSummary {
  url: string;
  name: string;
  owner: string | null | undefined;
  stars: number | null | undefined;
  forks: number | null | undefined;
  last_update: string | null | undefined;
}

/**
 * Function getAllReposForUser
 * Return list of all github repositories for const user defined above
 */
async function getAllReposForUser(): Promise<RepoSummary[]> {
  const auth = createUnauthenticatedAuth({
    reason: "Public facing web request in public repo",
  });

  const requestWithAuth = request.defaults({
    request: { hook: auth.hook },
  });

  const { data } = await requestWithAuth("GET /users/{username}/repos", {
    username,
  });

  const repos: RepoSummary[] = data.map((repo) => ({
    url: repo.html_url,
    name: repo.name,
    owner: repo.owner.name,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    last_update: repo.updated_at,
  }));

  return repos; //TODO: Retry if repos is empty
}

export default getAllReposForUser;
