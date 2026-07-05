import getAllReposForUser from "../fetchGitData";

export async function GET() {
  const repos = await getAllReposForUser();
  return Response.json(repos);
}
