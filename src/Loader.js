import React from 'react';
import Loader from 'react-loader-spinner';

const LoaderComp = ({load})=>{
    return(
        <Loader type="TailSpin"
        visible={load}
        color="#00BFFF"
        height={50}
        width={50}
        // timeout={3000} //3 secs
        />
    )
}

export default LoaderComp;