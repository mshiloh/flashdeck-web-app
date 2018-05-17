import React, { Component } from 'react'
export default class CardsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAnswer: false,
            showQuestion: true
        };
        this.revealAnswer = this.revealAnswer.bind(this);
        this.backToQuestion = this.backToQuestion.bind(this);
    }

    revealAnswer() {
        this.setState({
            showAnswer: true,
            showQuestion: false,
        });
    }
    backToQuestion() {
        this.setState({
            showAnswer: false,
            showQuestion: true,
        });
    }

    render() {
        const { deckId } = this.props.deckId._id;
        const { question, answer, _id, endpoint } = this.props;
        return (

            <div className="wrapperQA">
                <div className="containerQ">
                    {this.state.showQuestion ?
                        <p>{question}</p> : null
                    }
                    {this.state.showAnswer ?
                        <p>{answer}</p> : null
                    }

                </div>

                <div className="checkWrapper">
                    {this.state.showQuestion ?
                        <button onClick={this.revealAnswer} className="checkButt">Check </button> : null
                    }

                    {this.state.showAnswer ?
                        <button onClick={this.backToQuestion} className="checkButt">Back to Question</button> : null
                    }
                </div>

                <form className="answerForm">
                    <input className="answerInput" type="text" placeholder="Enter answer..." />
                </form>
            </div>
        )
    }
}



// import React, { Component } from 'react'
// export default class CardsItem extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             showAnswer: false,
//         };
//         this.revealAnswer = this.revealAnswer.bind(this);
//     }

//     revealAnswer() {
//         this.setState({
//             showAnswer: true,
//         });
//     }

//     render() {
//         const { deckId } = this.props.deckId._id;
//         const { question, answer, _id, endpoint } = this.props;
//         return (

//             <div className="wrapperQA">
//                 <div className="containerQ">
//                     <p>{question}</p>
//                 </div>

//                 {this.state.showAnswer ?
//                     <p className="correctAnswer">【 {answer} 】</p> : null
//                 }
//                 <div className="checkWrapper">
//                     <button onClick={this.revealAnswer} className="checkButt">Check</button>
//                 </div>
//                 <form className="answerForm">
//                     <input className="answerInput" type="text" placeholder="Enter answer..." />
//                 </form>
//             </div>
//         )
//     }
// }