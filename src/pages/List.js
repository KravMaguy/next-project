import Link from 'next/link'
import fetch from 'isomorphic-unfetch';

import { useEffect, useState } from 'react'

const List = ({ ownersList }) => {
    // const [owners, setOwners] = useState([])
    // console.log('1')
    // useEffect(() => {
    //     console.log('2')
    //     async function loadData() {
    //         console.log('3')
    //         const res = await fetch('http://localhost:4001/vehicles')
    //         console.log('4')
    //         console.log('waited on res =', res)
    //         const ownersList = await res.json()
    //         console.log('5')
    //         console.log('waited on owners List =', ownersList)
    //         setOwners(ownersList)
    //         console.log('6')
    //     }
    //     console.log('7')
    //     loadData()
    //     console.log('8')
    // }, []);
    // console.log('9')
    return (
        <div>
            {
                ownersList.map(function (e, idx) {
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

List.getInitialProps = async () => {
    const res = await fetch('http://localhost:4001/vehicles')
    const ownersList = await res.json()
    // return { ownersList: [{ ownerName: 'bruno' }] }
    return { ownersList: ownersList }
}

export default List;


// Thanks for the tutorial Bruno. Whats the point of the "if (!ctx.req)" part? By fetching the data with useEffect instead, aren't you "showing" your app twice? First without the fetched data and then with the fetched data? If the data you want to fetch is important in SEO terms, would this be the right approach? Thanks!.

// 1

// Bruno Antunes

// Bruno Antunes
// Bruno Antunes
// 2 weeks ago
// Thank you Luis 😊

// We only fetch data once, never twice 😊 Let me explain what's happening first.

// getInitialProps runs both on client side and server side: the ctx.req is only defined when you are on the server side. On client side ctx.req is not defined. 

// Regarding useEffect it only runs on the client side, it does not run on the server and you can see the check we have on the useEffect 
// ```
// if(ownersList.length == 0) {
//      loadData();
// }
// ``` - if we already have data, we don't fetch data again on useEffect 😊 

// So by now, you can see that in the useEffect we never ever double fetch, let's have a look into what's happening on the getIntialProps 😊 

// getInitialProps as I showed in the video (if your http call is slow) will block your navigation to the next page while the data is not fetched, which is not good for some UX people/teams.

// In order to have good SEO and happy UX teams, we can do what I did in this video 😊

// If you want to navigate directly to the next page and only on the next page fetch the data (our useEffect), you need to check if ctx.req is not defined and return null inside getInitialProps - this means we are in a client side navigation. Then on the new page, you fetch data using our useEffect.

// In cases where we did direct page navigation by URL (server side rendering - important for SEO), we have ctx.req defined, so we execute the call on the server side inside getInitialProps, then when the page hydrates on the client we already have data, so we don't fetch inside useEffect 😊

// This way we have the best of both worlds, very good SEO, and very good user experience navigating from page to page 😊

// In newer versions of nextjs we have also getServerSideProps which only runs on the server side, but have the "problem" of blocking on page navigation like getInitialProps and you can't do anything to avoid it like we did here: We have a detailed comparison with diagrams between the two showing where they run and why - https://youtu.be/61TngxLrP_0

// I hope I answered your question, if not, let me know and I'll try to help😊

