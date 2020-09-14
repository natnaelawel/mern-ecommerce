import React from 'react'
import Base from '../base/Base'
import config from '../../config';

function Home() {
    return (
      <div className="home">
        <Base title="Home page" description="sample home page">
          {config.API_URL}
        </Base>
      </div>
    );
}

export default Home
