import React,{useState,useEffect} from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import SerieDetail from "./serieDetail";
import Graph from './graph';

const Series=()=>{
    const [state, setState] = useState({series:[],onDetail:{}});

    const url_es="https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json";
    const url_en="https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json ";

    useEffect(() => {
        if(!navigator.onLine)
        {
           if(localStorage.getItem("series")!==null) 
           {
               setState({... state, series:localStorage.getItem("series")});
           }
        }
        else
        {
            let petition_url=(window.navigator.language==="en") ? url_en : url_es;
            fetch(petition_url).then(ans=>ans.json()).then(ans=>{
                console.log(ans);
                setState({... state, series:ans});
                localStorage.setItem("series",ans);
            }).catch(err=>console.log(err));
        }
    }, [])
    
    const toDetail=(s)=>{
        setState({... state, onDetail:s});
        console.log(state);
    };

    const render=()=>{
        if(state.onDetail!=={})
        {
            return(
                    <Row>
                        <Col>
                            <Row>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Channel</th>
                                            <th>Seasons</th>
                                            <th>Episodes</th>
                                            <th>Release Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.series.map(s=>(
                                            <tr onClick={()=>toDetail(s)}>
                                                <td>{s.id}</td>
                                                <td>{s.name}</td>
                                                <td>{s.channel}</td>
                                                <td>{s.seasons}</td>
                                                <td>{s.episodes}</td>
                                                <td>{s.release}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Row>
                            <Row>
                                <Graph info={state.series}/>
                            </Row>
                        </Col>
                    </Row>
            );
        }
        else
        {
            console.log(state.onDetail);
            return(
                <Row>
                    <Col>
                        <Row>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Channel</th>
                                        <th>Seasons</th>
                                        <th>Episodes</th>
                                        <th>Release Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.series.map(s=>(
                                        <tr onClick={()=>toDetail(s)}>
                                            <td>{s.id}</td>
                                            <td>{s.name}</td>
                                            <td>{s.channel}</td>
                                            <td>{s.seasons}</td>
                                            <td>{s.episodes}</td>
                                            <td>{s.release}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                        <Row>
                            <Graph info={state.series}/>
                        </Row>
                    </Col>
                    <Col>
                        <SerieDetail info={state.onDetail}/>
                    </Col>
                </Row>
        );
        }
    };

    return render();
};

export default Series;