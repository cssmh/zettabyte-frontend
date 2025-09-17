"use client";

import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { Post } from "@/types";
import Loading from "@/components/Loading";

const SinglePostPage = () => {
  const params = useParams();
  const { id } = params;

  const {
    data: post,
    loading,
    error,
  } = useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white text-black capitalize rounded-lg shadow-md p-8">
        <h1 className="text-2xl lg:text-3xl font-semibold mb-4">{post?.title}</h1>
        <p className="text-gray-600 mb-6">Post ID: {id}</p>
        <p className="text-lg leading-relaxed">{post?.body}</p>
      </article>
    </div>
  );
};

export default SinglePostPage;
