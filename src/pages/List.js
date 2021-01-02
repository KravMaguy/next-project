import Link from 'next/link'
import { useEffect, useState } from 'react'

const List = () => {
    const [owners, setOwners] = useState([])
    console.log('about to run useEffect')
    useEffect(() => {
        console.log('inside useEffect before async')
        async function loadData() {
            console.log('inside the async about to fetch')
            const res = await fetch('http://localhost:4001/vehicles')
            console.log('awaited on res =', res)
            const ownersList = await res.json()
            console.log('awaited on owners List =', ownersList)
            setOwners(ownersList)
            console.log('set the owners')
        }
        console.log('calling loadData')
        loadData()
        console.log('after LoadData')
    }, []);
    console.log('before the return')
    return (
        <div>
            {
                owners.map(function (e, idx) {
                    return (
                        <div key={idx}>
                            <Link as={`/${e.vehicle}/${e.ownerName}`} href="/[vehicle]/[person]">
                                <a>navigate to {e.vehicle}'s {e.ownerName}</a>
                            </Link>
                        </div>
                    )

                })
            }
        </div>
    );
}

export default List;