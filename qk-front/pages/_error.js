import Heading from "../components/UI/Heading/Heading"

export default function Error({ statusCode }) {
   return (
      <Heading h2>
         {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
      </Heading>
   )
}

Error.getInitialProps = ({ res, err }) => {
   const statusCode = res ? res.statusCode : err ? err.statusCode : 404
   return { statusCode }
}