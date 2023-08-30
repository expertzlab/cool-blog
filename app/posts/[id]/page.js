export default function ParamHome({params}){
    console.log('params:', params)
    return <h1>This is from Home {params.id} page</h1>;
}