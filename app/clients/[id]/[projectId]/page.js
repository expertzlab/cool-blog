
export default function ProjectDetailPage({ params }) {
	console.log(params);
          // {id: johnsmith', projectld: '123'}
	const {id: clientId, projectId } = params;
	return (<h1>Project {projectId} of {clientId}</h1>);
  }
