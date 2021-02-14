import React, { Component } from 'react';
import '../../css/AddImageModal.css';
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';

interface Props {
    title: string
    addImageToMeme: (position: string, file: File) => void
}

interface State {
    visible: Boolean
    addPosition: string
}

class AddImageModal extends Component<Props, State> {
    private fileInput: React.RefObject<any>;

    constructor(props: Props) {
        super(props)

        this.state = {
            visible: false,
            addPosition: "left",
        }

        this.fileInput = React.createRef();
        this.confirm = this.confirm.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
        this.setState({ visible: false })
    }

    private confirm() {
        this.props.addImageToMeme(this.state.addPosition, this.fileInput.current.files[0])
        this.setState({ visible: false })
    }    

    private closeModal() {
        this.setState({ visible: false })
    }
    
      
    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({addPosition: event.target.value});
    }

    render() {
        const { visible } = this.state;
        const { title } = this.props;

        return visible && <div className="modal-wrapper">
            <div className="modal">
                <div className="modal-title">{title}</div>

                <RadioGroup aria-label="Position" name="position-radioGroup" value={this.state.addPosition} onChange={this.handleChange}>
                    <FormControlLabel value="left" control={<Radio />} label="left" />
                    <FormControlLabel value="right" control={<Radio />} label="right" />
                    <FormControlLabel value="above" control={<Radio />} label="above" />
                    <FormControlLabel value="below" control={<Radio />} label="below" />
                </RadioGroup>

                <input type="file" ref={this.fileInput}></input>

                <div className="modal-operator">
                    <button className="modal-operator-close" onClick={this.closeModal}>cancel</button>
                    <button className="modal-operator-confirm" onClick={this.confirm}>confirm</button>
                </div>
                </div>
                <div className="mask"></div>
            </div>
    }
}

export default AddImageModal;
