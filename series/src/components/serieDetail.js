import React,{useState} from 'react';
import { Card } from 'react-bootstrap';

const SerieDetail=(props)=>{
    const [state, setstate] = useState(props.info);
    return(
        <Card>
            <Card.Body>
                <Card.Img variant="top" src={state.poster} />
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