// we pass params as props because it is a dynamic route
const EntryPage = ({params}: any) => {
  return (
    // it's "params.id" because that is the name of the folder 
    <div>{params?.id}</div>
  )
}

export default EntryPage