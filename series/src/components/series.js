import React,{useState,useEffect,useRef} from 'react';
import { Col, Row, Table, Jumbotron, Container } from 'react-bootstrap';
import SerieDetail from "./serieDetail";
import { FormattedMessage, FormattedDate } from "react-intl";
import * as d3 from "d3";

const Series=()=>{
    const [series, setSeries] = useState([]);
    const [onDetail, setonDetail] = useState(null);

    const canvas = useRef();

    const url_es="https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json";
    const url_en="https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json ";

    const drawChart=(datos)=> {
        const width = 700;
        const height = 500;
        const margin = { top:10, left:50, bottom: 40, right: 10};
        const iwidth = width - margin.left - margin.right;
        const iheight = height - margin.top -margin.bottom;

        const svg = d3
        .select(canvas.current).append("svg");
        svg.attr("width", width);
        svg.attr("height", height);

        let g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const y = d3.scaleLinear() 
        .domain([0, 1+Math.max.apply(Math,datos.map((o)=>{return o.seasons}))])
        .range([iheight, 0]);

        const x = d3.scaleLinear()
        .domain([0, 100+Math.max.apply(Math,datos.map((o)=>{return o.episodes}))])
        .range([0, iwidth]); 

        const  dots= g.append("g")
                    .selectAll("dot")
                    .data(datos)
                    .enter().append("g");

        dots.append("circle")
            .attr("class","dot")
            .attr("cx",(d)=>x(d.episodes))
            .attr("cy",(d)=>y(d.seasons))
            .attr("r", 5)
            .style("fill", "orange");

        dots.append("text")
            .attr("x",(d)=>x(d.episodes))
            .attr("y",(d)=>y(d.seasons))
            .text((d)=>d.name);

        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  

        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));

        g.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", iwidth)
        .attr("y", iheight-4)
        .text((window.navigator.language==="en") ? "Episodes" : "Episodios");

        g.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text((window.navigator.language==="en") ? "Seasons" : "Temporadas");
    };

    useEffect(() => {
        if(!navigator.onLine)
        {
           if(localStorage.getItem("series")!==null) 
           {
                setSeries(JSON.parse(localStorage.getItem("series")));
                drawChart(JSON.parse(localStorage.getItem("series")));
           }
        }
        else
        {
            let petition_url=(window.navigator.language==="en") ? url_en : url_es;
            fetch(petition_url).then(ans=>ans.json()).then(ans=>{
                setSeries(ans);
                localStorage.setItem("series",JSON.stringify(ans));
                drawChart(ans);
            }).catch(err=>console.log(err));
        }
    }, [])

    const renderDetail=()=>{
        if(onDetail)
        {
            console.log(onDetail);
            return(
                <Col>
                    <SerieDetail info={onDetail}/>
                </Col>
            );
        }
    };

    const toDetail=(s)=>{
        let setting = new Promise((resolve,reject)=>{
            setonDetail(null);
            resolve(s);
        });
        setting.then(ans=>setonDetail(ans));
    };

    const render=()=>{
        if(series.length===0)
        {
            return(
                <Jumbotron fluid>
                    <Container>
                        <h1><FormattedMessage id="Loading"/>... :( </h1>
                    </Container>
                </Jumbotron>
            );
        }
        else
        {
            return(
                <div>
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col"><FormattedMessage id="Name"/></th>
                                        <th scope="col"><FormattedMessage id="Channel"/></th>
                                        <th scope="col"><FormattedMessage id="Seasons"/></th>
                                        <th scope="col"><FormattedMessage id="Episodes"/></th>
                                        <th scope="col"><FormattedMessage id="Release Date"/></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {series.map(s=>(
                                        <tr onClick={()=>(!onDetail || onDetail.id!==s.id) ? toDetail(s):setonDetail(null)}>
                                            <td>{s.id}</td>
                                            <td>{s.name}</td>
                                            <td>{s.channel}</td>
                                            <td>{s.seasons}</td>
                                            <td>{s.episodes}</td>
                                            {/*<td>{s.release}</td>*/}
                                            {console.log(Date.parse(s.release))}
                                            <td><FormattedDate value={new Date(s.release.split("/")[2],s.release.split("/")[1],s.release.split("/")[0])} month="numeric" month="long" day="numeric" weekday="long" year="numeric"/></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        {renderDetail()}
                    </Row>
                    <Row>
                        <div ref={canvas}></div>
                    </Row>
                </div>
            );
        }
    };

    return render();
};

export default Series;