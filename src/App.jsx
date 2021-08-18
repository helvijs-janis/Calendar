import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Create from "./pages/Create";
import { RoomsProvider } from "./components/RoomContext";
import { ReservationsProvider } from "./components/ReservationContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ReservationsProvider>
          <RoomsProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/list" component={List} />
              <Route exact path="/create" component={Create} />
            </Switch>
          </RoomsProvider>
        </ReservationsProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Router>
    </QueryClientProvider>
  );
}
