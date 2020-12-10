import React from "react"
import { RouteComponentProps } from "react-router-dom";
import { apiEndpointUrl } from "../constants";
import Template from "./Template";

interface RouteParams {id: string}

interface State {
    templateUrl: string,
    isLoading: boolean,
    templateViews: number,
}

export default class ShowTemplate extends React.Component<RouteComponentProps<RouteParams>, State> {
    constructor(props: RouteComponentProps<RouteParams>) {
        super(props);
        
        this.state = {
            templateUrl: '',
            isLoading: true,
            templateViews: 0,
        }
    }


    async componentDidMount() {
        const id = this.props.match.params.id;

        const res = await fetch(apiEndpointUrl + 'template?id=' + id);
        const json = await res.json();

        this.setState({
            isLoading: false,
            templateUrl: json.data.template.url,
            templateViews: json.data.template.views,
        })
    }

    render() {
        const template = {url: this.state.templateUrl, views: this.state.templateViews, id: this.props.match.params.id};


        return (
            <div> 
                {!this.state.isLoading ? <Template template={template}/> : 'Loading'}
            </div>
        )
    }
}