"use client";
import useFetch from "@/hooks/useFetch";
import Card from "@/components/Card";
import { Post } from "@/types";
import Loading from "@/components/Loading";

const PostsPage = () => {
  const { data: posts, loading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <h1 className="text-2xl font-bold text-black">All Posts</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {posts?.map((post, index) => (
          <Card
            key={post.id}
            title={post.title}
            body={post.body}
            id={post.id}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
