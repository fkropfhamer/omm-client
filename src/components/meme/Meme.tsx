import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    PinterestShareButton,
    VKShareButton,
    OKShareButton,
    RedditShareButton,
    TumblrShareButton,
    LivejournalShareButton,
    MailruShareButton,
    ViberShareButton,
    WorkplaceShareButton,
    LineShareButton,
    PocketShareButton,
    InstapaperShareButton,
    EmailShareButton,
    FacebookShareCount,
    TwitterIcon,
    FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    WhatsappIcon,
    RedditIcon,
    RedditShareCount,
    TumblrIcon,
    TumblrShareCount,
    LivejournalIcon, MailruIcon, ViberIcon, WorkplaceIcon, LineIcon, EmailIcon,
} from 'react-share';

export interface MemeObject {
    url: string,
    name: string,
    views: number,
}

interface Props {
    meme: MemeObject
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

export default function Meme(props: Props) {
    const {name, url, views} = props.meme;

    return <div>
        <h1>{name}</h1>
        <img src={url} alt={'meme with name "' + name + '".'}></img>
        <h1>Views: {views}</h1>
        <button onClick={() => {
            download(url, name);
        }}>download
        </button>
        <h1>Share: </h1>
        <FacebookShareButton
            url={url}
            quote={name}
        > <FacebookIcon size={30} round/>
        </FacebookShareButton>
        <FacebookMessengerShareButton
            url={url}
            appId="521270401588372"
        ><FacebookMessengerIcon size={30} round/>
        </FacebookMessengerShareButton>
        <TwitterShareButton
            url={url}
            title={name}
        ><TwitterIcon size={30} round/>
        </TwitterShareButton>
        <WhatsappShareButton
            url={url}
            title={name}
            separator=":: "
        >
            <WhatsappIcon size={30} round/>
        </WhatsappShareButton>
        <RedditShareButton
            url={url}
            title={name}
            windowWidth={660}
            windowHeight={460}
        >
            <RedditIcon size={30} round/>
        </RedditShareButton>
        <TumblrShareButton
            url={url}
            title={name}
        >
            <TumblrIcon size={30} round/>
        </TumblrShareButton>
        <LivejournalShareButton
            url={url}
            title={name}
            description={url}
        >
            <LivejournalIcon size={30} round/>
        </LivejournalShareButton>
        <MailruShareButton
            url={url}
            title={name}
        >
            <MailruIcon size={30} round/>
        </MailruShareButton>
        <EmailShareButton
            url={url}
            subject={name}
            body="body"
            openShareDialogOnClick={true}
        >
            <EmailIcon size={30} round/>
        </EmailShareButton>
        <ViberShareButton
            url={url}
            title={name}
        >
            <ViberIcon size={30} round/>
        </ViberShareButton>
        <WorkplaceShareButton
            url={url}
            quote={name}
        >
            <WorkplaceIcon size={30} round/>
        </WorkplaceShareButton>

        <LineShareButton
            url={url}
            title={name}
        >
            <LineIcon size={30} round/>
        </LineShareButton>

    </div>
}