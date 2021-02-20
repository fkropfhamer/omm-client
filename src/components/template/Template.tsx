import React from "react";
import {Link} from "react-router-dom";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton, LineIcon, LineShareButton,
    LivejournalIcon,
    LivejournalShareButton,
    MailruIcon,
    MailruShareButton,
    RedditIcon,
    RedditShareButton,
    TumblrIcon,
    TumblrShareButton,
    TwitterIcon,
    TwitterShareButton, ViberIcon, ViberShareButton,
    WhatsappIcon,
    WhatsappShareButton, WorkplaceIcon, WorkplaceShareButton
} from "react-share";

export interface TemplateObject {
    url: string,
    id: string,
    views: number,
}

interface Props {
    template: TemplateObject
}

async function toDataURL(url: string) {
    const response = await fetch(url)
    const blob = await response.blob();

    return URL.createObjectURL(blob);

}

async function download(url: string, name: string) {
    const a = document.createElement("a");
    a.href = await toDataURL(url);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export default function Template(props: Props) {
    const {id, url, views} = props.template;
    console.log(url);
    return <div>
        <img src={url} alt={'meme with id "' + id + '".'}></img>
        <h1>Views: {views}</h1>
        <button onClick={() => {
            download(url, 'template-' + id + '.png');
        }}>download
        </button>
        <h1>Share: </h1>
        <FacebookShareButton
            url={url}
            //    quote=' '
        > <FacebookIcon size={30} round/>
        </FacebookShareButton>
        <FacebookMessengerShareButton
            url={url}
            appId="521270401588372"
        ><FacebookMessengerIcon size={30} round/>
        </FacebookMessengerShareButton>
        <TwitterShareButton
            url={url}
            //  title=' '
        ><TwitterIcon size={30} round/>
        </TwitterShareButton>
        <WhatsappShareButton
            url={url}
            // title=' '
            separator=":: "
        >
            <WhatsappIcon size={30} round/>
        </WhatsappShareButton>
        <RedditShareButton
            url={url}
            //  title=' '
            windowWidth={660}
            windowHeight={460}
        >
            <RedditIcon size={30} round/>
        </RedditShareButton>
        <TumblrShareButton
            url={url}
            //   title=' '
        >
            <TumblrIcon size={30} round/>
        </TumblrShareButton>
        <LivejournalShareButton
            url={url}
            //  title=' '
            description={url}
        >
            <LivejournalIcon size={30} round/>
        </LivejournalShareButton>
        <MailruShareButton
            url={url}
            //   title=' '
        >
            <MailruIcon size={30} round/>
        </MailruShareButton>
        <EmailShareButton
            url={url}
            subject=' '
            body="body"
            openShareDialogOnClick={true}
        >
            <EmailIcon size={30} round/>
        </EmailShareButton>
        <ViberShareButton
            url={url}
            //  title=' '
        >
            <ViberIcon size={30} round/>
        </ViberShareButton>
        <WorkplaceShareButton
            url={url}
            // quote=' '
        >
            <WorkplaceIcon size={30} round/>
        </WorkplaceShareButton>

        <LineShareButton
            url={url}
            //title=' '
        >
            <LineIcon size={30} round/>
        </LineShareButton>
        <Link to={'/meme/edit/' + id}>create Meme from this template.</Link>
    </div>
}
