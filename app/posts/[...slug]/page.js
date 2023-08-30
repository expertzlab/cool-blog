export default function AnotherProjectDetailPage({ params }) {
    console.log(params);
      	// {id: johnsmith', projectld: '123'}
    const {slug} = params;
	const postDate = slug?.join("/")
    return (<h1>Another Details Page - Post {postDate}</h1>);
  }
