import React from 'react';
import Link from 'gatsby-link'
//import ArtView from './ArtView'
const ArtPosts = (props) => {
    return (
      <section id="art-feed">
        <ul>
        {props.postData.edges.map((post, idx) => (
          <li key={idx}>
            <Link to={post.node.fields.slug}>
              {post.node.frontmatter.title}
            </Link>
          </li>
        ))}
        </ul>
      </section>
    );
};

export default ArtPosts