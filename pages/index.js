import Head from "next/head";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import { getAllPosts } from "../lib/test-data";
import { client } from "../lib/apollo";
import { gql } from "@apollo/client";

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>Headless WP NextJS Graphql</title>
        <link rel="icon" href="favicon.ico"></link>
      </Head>

      <main>
        <h1 className="title">Headless WP NextJS Graphql</h1>

        <div className="grid">
          {posts.map((post) => {
            return <PostCard key={post.uri} post={post}></PostCard>;
          })}
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
}

export async function getStaticProps() {
  const GET_POSTS = gql`
    query GetAllPosts {
      posts {
        nodes {
          title
          content
          uri
          date
        }
      }
    }
  `;
  const response = await client.query({
    query: GET_POSTS,
  });
  const posts = response?.data?.posts?.nodes;
  return {
    props: {
      posts,
    },
  };
}
