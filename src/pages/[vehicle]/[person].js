import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Person = ({ ownersList }) => {
    const router = useRouter()
    console.log(router.query)
    const [owners, setOwners] = useState(ownersList)
    console.log('1')
    useEffect(() => {
        console.log('2')
        async function loadData() {
            console.log('3')
            const res = await fetch('http://localhost:4001/vehicles?ownerName=' + router.query.person + '&vehicle=' + router.query.vehicle)
            console.log('4')
            console.log('waited on res =', res)
            const ownersList = await res.json()
            console.log('5')
            console.log('waited on owners List =', ownersList)
            setOwners(ownersList)
            console.log('6')
        }
        console.log('7')
        if (owners.length == 0) {
            loadData()
        }
        console.log('8')
    }, []);
    console.log('9')
    if (!owners[0]) {
        return <div>loading...</div>
    }
    return <pre>{owners[0]?.details}</pre>
    // return (<h2>{router.query.person}'s {router.query.vehicle}</h2>);
}

Person.getInitialProps = async (ctx) => {
    if (!ctx.req) {
        return { ownersList: [] }
    }
    const query = ctx.query
    const res = await fetch('http://localhost:4001/vehicles?ownerName=' + query.person + '&vehicle=' + query.vehicle)
    const ownersList = await res.json()
    return { ownersList: ownersList }
}

export default Person;