import Post from "@/components/Post";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { onDeletePost } from "./_actions/actions";

export default async function Home() {
  // Comprobar si el usuario está autenticado
  const isSignedIn = await isAuthenticated();

  if (!isSignedIn)
    return (
      <main className="flex flex-col items-center justify-between p-24 w-1/2 m-auto">
        <h1 className="text-2xl pb-10">Welcome 👨‍💻</h1>
      </main>
    );

  // Obtener todos los posts
  const { data: posts } = await cookieBasedClient.models.Post.list({
    selectionSet: ["title", "id"],
    authMode: "userPool",
  });

  return (
    <main className="flex flex-col items-center justify-between p-24 w-1/2 m-auto">
      <h1 className="text-2xl pb-10">List of all titles</h1>
      {posts?.map((post, idx) => (
        <Post
          onDelete={onDeletePost}
          post={post}
          key={idx}
          isSignedIn={isSignedIn} // Pasar directamente el estado de autenticación
        />
      ))}
    </main>
  );
}
