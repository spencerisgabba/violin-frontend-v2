"use client"
import React from 'react';
import "./Services.scss";
import "@/app/components/Carousel/carouselStyle.module.scss"
const Page = () => {
    return (
        <div>
            {/*<Carousel />*/}
            <div className="flex flex-col servList">
                <div>
                    <h1>Repair</h1>
                    <div className={"backgroundImage1"}></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id tristique ipsum.
                        Donec ac lacus eu purus hendrerit mattis et ac magna. Duis non tincidunt eros. Cras
                        feugiat dui sit amet nisl accumsan, ut hendrerit justo pellentesque. Integer at nisi
                        ac sapien feugiat eleifend sed non turpis. Proin elementum vitae lectus sed pretium.
                        Quisque maximus sit amet nisi non congue. Sed ut vestibulum leo. Fusce vitae molestie
                        odio. Phasellus consequat urna enim, sit amet rutrum elit porta commodo. Class
                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        Nam vitae augue orci.
                    </p>
                </div>
                <div className="servContainer">
                    <h1 className="text-left">Replace</h1>
                    <div className="backgroundImage2"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id tristique ipsum.
                        Donec ac lacus eu purus hendrerit mattis et ac magna. Duis non tincidunt eros. Cras
                        feugiat dui sit amet nisl accumsan, ut hendrerit justo pellentesque. Integer at nisi
                        ac sapien feugiat eleifend sed non turpis. Proin elementum vitae lectus sed pretium.
                        Quisque maximus sit amet nisi non congue. Sed ut vestibulum leo. Fusce vitae molestie
                        odio. Phasellus consequat urna enim, sit amet rutrum elit porta commodo. Class
                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                        Nam vitae augue orci.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
