import React, {
  Component,
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";

import Hook, { createHookComponent } from "hook-component";

import { useToggle, useIdle } from "react-use";

import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { useQuery, ApolloProvider } from "react-apollo-hooks";
import gql from "graphql-tag";

const apolloClient = new ApolloClient({
  link: createHttpLink({
    uri: "https://graphql-pokemon.now.sh/"
  }),
  cache: new InMemoryCache()
});

const Effect = createHookComponent(useEffect);
const Memo = createHookComponent(useMemo);
const Callback = createHookComponent(useCallback);
const Toggle = createHookComponent(useToggle);
const Query = createHookComponent(useQuery);

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <div style={{ margin: "auto", width: "40rem", padding: "1rem" }}>
          <Hook hook={useState} args={[0]}>
            {([count, setCount]) => (
              <>
                <h2>count some sheep</h2>
                <Callback
                  args={[() => setCount(count => count + 1), [setCount]]}
                >
                  {callback => (
                    <button onClick={callback}>{"Add Sheep"}</button>
                  )}
                </Callback>
                <Hook
                  hook={useCallback}
                  args={[() => setCount(count - 1), [count, setCount]]}
                >
                  {callback => (
                    <button onClick={callback}>{"Remove Sheep"}</button>
                  )}
                </Hook>
                <Title title={"at least " + Math.round(count / 10) + "0 🐑"} />
                <Memo args={[() => "🐑".repeat(Math.abs(count)), [count]]}>
                  {sheep => <div>{sheep}</div>}
                </Memo>
              </>
            )}
          </Hook>

          <h2>find out the number (?) of the pokemon</h2>
          <ApolloTest />
          <ApolloCreateTest />

          <h2>control earths lil friend</h2>
          <Toggle args={[true]}>
            {([on, toggle]) => (
              <button onClick={() => toggle()}>{on ? "🌕" : "🌑"}</button>
            )}
          </Toggle>

          <h2>become idle</h2>
          <Hook hook={useIdle}>
            {idle => <div>{idle ? "idle" : "not idle"}</div>}
          </Hook>
        </div>
      </ApolloProvider>
    );
  }
}

const POKE_QUERY = gql`
  query PikachuQuery {
    pokemon(name: "Pikachu") {
      id
      number
      name
    }
  }
`;

class ApolloTest extends Component {
  render() {
    return (
      <Hook hook={useQuery} args={[POKE_QUERY]}>
        {({ error, data, loading }) => {
          if (loading) {
            return <div>{"Loading"}</div>;
          } else if (error) {
            return <div>{"error"}</div>;
          } else if (data && data.pokemon) {
            return <div>{data.pokemon.name + ": " + data.pokemon.number}</div>;
          }
        }}
      </Hook>
    );
  }
}

class ApolloCreateTest extends Component {
  render() {
    return (
      <Query args={[POKE_QUERY]}>
        {({ error, data, loading }) => {
          if (loading) {
            return <div>{"Loading"}</div>;
          } else if (error) {
            return <div>{"error"}</div>;
          } else if (data && data.pokemon) {
            return <div>{data.pokemon.name + ": " + data.pokemon.number}</div>;
          }
        }}
      </Query>
    );
  }
}

class Title extends React.Component<{ title: string }> {
  render() {
    const { title } = this.props;
    console.log("rendering title");
    return (
      <Effect
        args={[
          () => {
            document.title = title;
            console.log("updating title");
          },
          [title]
        ]}
      />
    );
  }
}
