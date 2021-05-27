import React,{useState} from 'react';
import { Card } from 'react-bootstrap';
import { FormattedMessage} from "react-intl";

const SerieDetail=(props)=>{
    const [state] = useState(props.info);
    return(
        <Card>
            <Card.Body>
                {(navigator.onLine) ? <Card.Img variant="top" src={state.poster} />:<FormattedMessage id="Error Loading Image"/>}
                <Card.Title>
                    {state.name}
                </Card.Title>
                <Card.Text>
                    {state.description}
                </Card.Text>
                <Card.Footer>
                    <a href={state.webpage}>{state.webpage}</a>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default SerieDetail;