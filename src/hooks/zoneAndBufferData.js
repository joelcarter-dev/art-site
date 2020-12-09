import { useStaticQuery, graphql } from "gatsby"

export const useZoneAndBufferData = () => {
  const { site } = useStaticQuery(
    graphql`
      query ZoneAndBufferData {
        site {
          siteMetadata {
            postingZones {
              postingCost
              name
            },
            globalItemBuffer
          }
        }
      }
    `
  )
  return site.siteMetadata
}
