import React, { FC } from 'react'
import Home from './home/Home'
import MyTeam from './home/MyTeam'
import MasVotadas from './home/MasVotadas'
import Ranking from './home/Ranking'

interface Props {
    site: {
        siteName: string,
        id: string
    },
    setSite: React.Dispatch<React.SetStateAction<{
        siteName: string;
        id: string;
    }>>
}

const Principal: FC<Props> = ({ site, setSite }) => {
    return (
        <>
            {site.siteName === 'home' && <Home modifier={setSite} />}
            {site.id && site.siteName === 'my-team' && <MyTeam modifier={setSite} appId={site.id} />}
            {site.siteName === 'position' && <MasVotadas modifier={setSite} />}
            {site.siteName === 'ranking' && <Ranking modifier={setSite} />}
        </>
    )
}

export default Principal