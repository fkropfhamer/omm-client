import React, { Component } from "react";
import '../../css/TemplateSelector.css';

interface Template {
    name: string,
    url: string,
    width: number,
    height: number
}

interface State {
    isLoading: boolean
    templates: Template[]
    templateName: string
}

interface Props {
    onChangeTemplate: (imgUrl: string) => void
}

export default class PopularTemplateSelector extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            isLoading: true,
            templates: [],
            templateName: ""
        }

        this.changeTemplateName = this.changeTemplateName.bind(this);
    }

    async componentDidMount() {
        const res = await fetch('https://api.imgflip.com/get_memes');
        const json = await res.json();

        this.setState({templates: json.data.memes})
        this.setState({isLoading: false})
    }

    private changeTemplateName(name: string) {
        this.setState({templateName: name});
    }

    render(){
        return (
            <div>
                <p>{this.state.templateName}</p>
                <div id="template-select-popular" className="template-select">
                    {!this.state.isLoading ? 
                        this.state.templates.map((template, idx) =>
                            (
                            <div className="im" onClick={() => this.props.onChangeTemplate(template.url)} onMouseOver={() => this.changeTemplateName(template.name)} key={idx} style={{backgroundImage: `url(${template.url})`}}/>)
                            ) : 'Loading'}
                </div>
            </div>

        )
      } 

      
}
