import React, { Component } from 'react';

class ArchiveItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>working</div>
        );
    }
}

export default ArchiveItem;

// export const pageQuery = graphql`
//   query ArciveItemByID($id: String!) {
//     markdownRemark(id: { eq: $id }) {
//       id
//       html
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         title
      
//         tags
        
       
          
//       }
//     }
//   }
// `