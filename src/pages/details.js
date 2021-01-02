import Link from 'next/link'
const people = [
    { v: 'car', name: 'Yak' },
    { v: 'bike', name: 'Abe' },
    { v: 'boat', name: 'Robert' }
]
const Details = () => {
    return (
        <div>
            {
                people.map((e, idx) =>
                    <div >
                        <Link key={idx} as={`/${e.v}/${e.name}`} href="/[vehicle]/[person]">
                            <a>navigate to {e.name}'s {e.v}</a>
                        </Link>
                    </div>
                )
            }
        </div>
    );
}

export default Details;