import React from 'react';
import Link from 'gatsby-link'
//import ArtView from './ArtView'
const ArtPosts = (props) => {
    return (
      <section id="art-feed">
        
        {props.postData.edges.map((post, idx) => (
          <Link to={post.node.fields.slug} key={idx}>
            {post.node.frontmatter.title}
          </Link>
        ))}
        
      </section>
    );
};

export default ArtPosts