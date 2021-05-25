import React,{useState} from 'react';
import { Card } from 'react-bootstrap';

const SerieDetail=(props)=>{
    const [state, setstate] = useState(props.info);
    return(
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {state.name}
                    </Card.Title>
                    <Card.Text>
                        {state.description}
                    </Card.Text>
                    <Card.Footer>
                        {state.webpage}
                    </Card.Footer>
                </Card.Body>
            </Card>
        </div>
    );
};

export default SerieDetail;