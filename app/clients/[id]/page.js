export default function ProjectDetailPage({ params }) {
	console.log(params);
          // {id: johnsmith', projectld: '123'}
	//const {id: clientId, projectId } = params;
	return (<h1>Client ID only: {params.id}</h1>);
  }