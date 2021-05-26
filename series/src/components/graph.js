import React,{useState,useRef,useEffect} from 'react';
import * as d3 from "d3";

const Graph=(props)=>{
    const [state, setstate] = useState(props.info);
    const canvas = useRef();
    const drawChart=()=> {
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
        .domain([0, Math.max.apply(Math,state.map((o)=>{return o.seasons}))])
        .range([iheight, 0]);

        const x = d3.scaleBand()
        .domain([0, Math.max.apply(Math,state.map((o)=>{return o.episodes}))])
        .range([0, iwidth])
        .padding(0.1); 

        g.append("g")
        .classed("x--axis", true)
        .call(d3.axisBottom(x))
        .attr("transform", `translate(0, ${iheight})`);  

        g.append("g")
        .classed("y--axis", true)
        .call(d3.axisLeft(y));
    }
    useEffect(() => {
        drawChart();
    });
    return(
        <div ref={canvas}></div>
    );
};

export default Graph;