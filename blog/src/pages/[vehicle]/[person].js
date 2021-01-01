import {useRouter} from 'next/router'
const Person = () => {
    const router = useRouter()
    console.log(router.query)
    return (<h2>{router.query.person}'s {router.query.vehicle}</h2>);
}

export default Person;