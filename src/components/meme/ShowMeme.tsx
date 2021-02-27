import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../../constants";
import Meme from "./Meme";

interface RouteParams {
  id: string;
}

interface State {
  imgUrl: string;
  imgName: string;
  isLoading: boolean;
  imgViews: number;
  imgFileformat: string;
  imgComments: string[];
  imgVotes: string[];
  imgTags: string[];
  imgCreatedAt: any;
}

export default class ShowMeme extends React.Component<
  RouteComponentProps<RouteParams>,
  State
> {
  constructor(props: RouteComponentProps<RouteParams>) {
    super(props);

    this.state = {
      imgUrl: "",
      imgName: "",
      isLoading: true,
      imgViews: 0,
      imgFileformat: "",
      imgComments: [],
      imgVotes: [],
      imgTags: [],
      imgCreatedAt: "",
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
 console.log('id is'+id);
    const res = await fetch(apiEndpointUrl + "meme?id=" + id);
    const json = await res.json();

    this.setState({
      isLoading: false,
      imgUrl: json.data.meme.url,
      imgName: json.data.meme.name,
      imgViews: json.data.meme.views,
      imgFileformat: json.data.meme.fileformat,
      imgComments: json.data.meme.comments,
      imgVotes: json.data.meme.votes,
      imgTags: json.data.meme.tags,
      imgCreatedAt: json.data.meme.createdAt,
    });
  }

  render() {
    const meme = {
      url: this.state.imgUrl,
      name: this.state.imgName,
      views: this.state.imgViews,
      fileformat: this.state.imgFileformat,
      comments: this.state.imgComments,
      votes: this.state.imgVotes,
      tags: this.state.imgTags,
      createdAt: this.state.imgCreatedAt,
    };

    return (
      <div>{!this.state.isLoading ? <Meme meme={meme} /> : "Loading"}</div>
    );
  }
}
