import React from 'react';

const AppWrap = (Component) =>
    function HOC() {
        return (
            <div className="float-right h-screen w-full pl-[6rem] pt-[1.5rem] pb-[1.5rem] pr-[2rem] xl:w-[85%] xl:pl-[2rem] 1700:w-[88%]">
                <Component />
            </div>
        );
    };

export default AppWrap;