import { useStaticQuery, graphql } from "gatsby"

export const useCommissionStatus = () => {
  const { site } = useStaticQuery(
    graphql`
      query CommissionStatus {
        site {
          siteMetadata {
            commissionsOpen
          }
        }
      }
    `
  )
  return site.siteMetadata
}
