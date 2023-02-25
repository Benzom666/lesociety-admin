import React, { useEffect, useState } from "react";
import { Card, Dropdown, Col, Row, ProgressBar } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import PageHeader from "../pageContainer/header";
import { TbDots } from "react-icons/tb";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useDispatch, useSelector } from "react-redux";
import { CategoryScale } from "chart.js";
import {
  getCountry,
  getDashboardStats,
  getDashboardStatsDeactive,
  getDashboardStatsNew,
  getGeoStats,
  getRegDashboard,
  getRegDashboardMale,
  getUnRegDashboard,
  getUnRegDashboardMale,
  getRegisterUserCount
} from "./action";
import moment from "moment";
import Utils from "../../utility";
Chart.register(CategoryScale);

const PageContainer = (props) => {
  const [geoData, setGeoData] = useState({
    place: "",
    gender: "",
    locationType: "country",
  });
  const {
    registerCompFemaleList,
    registerCompMaleList,
    registerUnCompFemaleList,
    registerUnCompMaleList,
    geoStats,
    dashboardStats,
    rEndDate,
    rStartDate,
    unRstartDate,
    unRendDate,
    registerUserCount,
  } = useSelector((state) => state.userListReducer);
  console.log(registerUserCount);
  const {activeUsers, newUsers, pendingUsers} = registerUserCount;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegDashboard());
    dispatch(getRegDashboardMale());
    dispatch(getUnRegDashboard());
    dispatch(getUnRegDashboardMale());
    dispatch(getCountry());
    dispatch(getGeoStats());
    dispatch(getRegisterUserCount());
  }, []);
  const data = {
    labels:
      !!registerCompFemaleList &&
      registerCompFemaleList.map((value) => [
        moment.utc(value?.created_at).format("DD/MM"),
      ]),
    datasets: [
      {
        label: "Women",
        data:
          !!registerCompFemaleList &&
          registerCompFemaleList.map((value) => value?.count),
        fill: false,
        backgroundColor: "rgb(242 68 98 / 22%)",
        borderColor: "#f24462",
        tension: 0.5,
        borderWidth: 1.5,
        pointBorderWidth: 0,
        pointRadius: 0,
      },
      {
        label: "Men",
        data:
          !!registerCompMaleList &&
          registerCompMaleList.map((value) => value?.count),
        fill: true,
        borderColor: "#618CB4",
        tension: 0.5,
        backgroundColor: "rgb(93 137 179 / 25%)",
        borderWidth: 1.5,
        pointBorderWidth: 0,
        pointRadius: 0,
      },
    ],
  };
  const unCompdata = {
    labels:
      !!registerUnCompFemaleList &&
      registerUnCompFemaleList.map((value) => [
        moment.utc(value?.created_at).format("DD/MM"),
      ]),
    datasets: [
      {
        label: "Women",
        data:
          !!registerUnCompFemaleList &&
          registerUnCompFemaleList.map((value) => value?.count),
        fill: false,
        redraw: true,
        backgroundColor: "rgb(242 68 98 / 22%)",
        borderColor: "#f24462",
        tension: 0.5,
        borderWidth: 1.5,
        pointBorderWidth: 0,
        pointRadius: 0,
      },
      {
        label: "Men",
        data:
          !!registerUnCompMaleList &&
          registerUnCompMaleList.map((value) => value?.count),
        fill: true,
        redraw: true,
        borderColor: "#618CB4",
        tension: 0.5,
        backgroundColor: "rgb(93 137 179 / 25%)",
        borderWidth: 1.5,
        pointBorderWidth: 0,
        pointRadius: 0,
      },
    ],
  };
  const { count = 0, percent = 0, sign = "" } = dashboardStats;
  const dashboardStatsFunc = (func, status, timeframe, type) => {
    dispatch(
      func(
        status,
        moment().subtract(timeframe, type).utc().format(),
        moment().utc().format()
      )
    );
  };
  const getGeoLocationData = (place, gender, locationType) => {
    dispatch(getGeoStats(place, gender, locationType));
    setGeoData({ place, gender, locationType });
  };
  return (
    <div className="inner-page">
      <PageHeader title="Dashboard" />
      <div className="dashboardPageUI">
        <Row>
          <Col md="4" sm="12">
            <Card className="gridCard">
              <Card.Header>
                <Card.Title>Active Users</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>{activeUsers?.count || 0}{" "} people</Card.Subtitle>
                <Card.Text>
                    {pendingUsers?.percent}
                    %{" "}
                  </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4" sm="12">
            <Card className="gridCard">
              <Card.Header>
                <Card.Title>New Users</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>
                  {newUsers?.count || 0}{" "}
                  people
                </Card.Subtitle>
                {newUsers && newUsers?.percent ? (
                  <Card.Text>
                    {newUsers?.percent}
                    %{" "}
                  </Card.Text>
                ) : (
                  <Card.Text> 0 %</Card.Text>
                )}
              </Card.Body>
            </Card>
          </Col>
          <Col md="4" sm="12">
            <Card className="gridCard">
              <Card.Header>
                <Card.Title>Pending Users</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle>
                  {pendingUsers && pendingUsers?.count}{" "}
                  people
                </Card.Subtitle>
                <Card.Text>
                    {pendingUsers?.percent}
                    %{" "}
                    {/* {dashboardStatsNew[0]?.sign === "-" ? (
                      <img src="/images/downArrow.svg" />
                    ) : dashboardStatsNew[0]?.sign === "+" ? (
                      <img src="/images/upArrow.svg" />
                    ) : (
                      ""
                    )} */}
                  </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md="8" sm="12">
            <Card className="gridCard">
              <Card.Header>
                <Row className="w-100">
                  <Col md="8">
                    <Card.Title> Registration Completed </Card.Title>
                  </Col>
                  <Col md="4" className="clandr-date">
                    <DateTimePicker
                      onChange={(e) => {
                        dispatch({
                          type: Utils.ActionName.GET_REGCOMPFEMALE,
                          type: Utils.ActionName.GET_REGCOMPMALE,
                          payload: { rStartDate: e },
                        });
                        dispatch(getRegDashboard("", rStartDate, rEndDate));
                        dispatch(getRegDashboardMale("", rStartDate, rEndDate));
                      }}
                      value={rStartDate}
                      calendarClassName="graphFilter"
                      disableClock="false"
                      format="dd/MM/y"
                      minDetail="decade"
                    />
                    <span className="dategap"> - </span>
                    <DateTimePicker
                      onChange={(e) => {
                        dispatch({
                          type: Utils.ActionName.GET_REGCOMPFEMALE,
                          type: Utils.ActionName.GET_REGCOMPMALE,
                          payload: { rEndDate: e },
                        });
                        dispatch(getRegDashboard("", rStartDate, rEndDate));
                        dispatch(getRegDashboardMale("", rStartDate, rEndDate));
                      }}
                      value={rEndDate}
                      calendarClassName="graphFilter"
                      disableClock="false"
                      format="dd/MM/y"
                    />
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Line data={data} />
              </Card.Body>
            </Card>
            {/* end section */}
            <Card className="gridCard">
              <Card.Header>
                <Row className="w-100">
                  <Col md="8">
                    <Card.Title> Registration Uncompleted </Card.Title>
                  </Col>
                  <Col md="4" className="clandr-date">
                    <DateTimePicker
                      onChange={(e) => {
                        dispatch({
                          type: Utils.ActionName.GET_REGUNCOMPFEMALE,
                          type: Utils.ActionName.GET_REGUNCOMPMALE,
                          payload: { unRstartDate: e },
                        });
                        dispatch(
                          getUnRegDashboard("", unRstartDate, unRendDate)
                        );
                        dispatch(
                          getUnRegDashboardMale("", unRstartDate, unRendDate)
                        );
                      }}
                      value={unRstartDate}
                      calendarClassName="graphFilter"
                      disableClock="false"
                      format="dd/MM/y"
                    />
                    <span className="dategap"> - </span>
                    <DateTimePicker
                      onChange={(e) => {
                        dispatch({
                          type: Utils.ActionName.GET_REGUNCOMPFEMALE,
                          type: Utils.ActionName.GET_REGUNCOMPMALE,
                          payload: { unRendDate: e },
                        });
                        dispatch(
                          getUnRegDashboard("", unRstartDate, unRendDate)
                        );
                        dispatch(
                          getUnRegDashboardMale("", unRstartDate, unRendDate)
                        );
                      }}
                      value={unRendDate}
                      calendarClassName="graphFilter"
                      disableClock="false"
                      format="dd/MM/y"
                    />
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Line data={unCompdata} />
              </Card.Body>
            </Card>
          </Col>

          <Col md="4" sm="12">
            <Card className="gridCard">
              <Card.Header>
                <Card.Title> Geo </Card.Title>
                <Card.Link
                  role="button"
                  onClick={() => {
                    getGeoLocationData("", "", "country");
                  }}
                >
                  Country
                </Card.Link>
                {/* <Card.Link onClick={() => {
                  dispatch(getGeoStats("", "", "city"))}}> City </Card.Link> */}

                <Dropdown
                  align="end"
                  style={{ marginLeft: "16px", cursor: "pointer" }}
                >
                  <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="secondary"
                  >
                    <TbDots />
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item
                      onClick={() => {
                        getGeoLocationData(
                          geoData.place,
                          "female",
                          geoData.locationType
                        );
                      }}
                    >
                      Female
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        getGeoLocationData(
                          geoData.place,
                          "male",
                          geoData.locationType
                        );
                      }}
                    >
                      Male
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        getGeoLocationData(
                          geoData.place,
                          "",
                          geoData.locationType
                        );
                      }}
                    >
                      Both
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Header>
              <Card.Body>
                <Row className="w-100">
                  {geoStats.length > 0
                    ? geoStats.map((value, index) => {
                        return (
                          <Col
                            md="6"
                            className="mb-4 progressBarBox"
                            role={geoData.locationType === "country" ? "button" : ""}
                            onClick={() => {
                              if (geoData.locationType === "country") {
                                getGeoLocationData(
                                  value?.location,
                                  geoData.gender,
                                  "city"
                                );
                              }
                            }}
                          >
                            <h6  className= {(geoData.locationType === "country") ? "location-country" : ""}>
                              {" "}
                              {value?.location}{" "}
                              <span>{value?.totalCount}%</span>{" "}
                            </h6>
                            <ProgressBar now={value?.totalCount} />
                          </Col>
                        );
                      })
                    : "Record Not Found."}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default PageContainer;
