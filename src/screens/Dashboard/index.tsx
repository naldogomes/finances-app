import React from "react";

import { HighlighCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  LogoutButton,
  Icon,
  HighlighCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      date: "13/04/2020",
      category: { name: "Vendas", icon: "dollar-sign" },
    },
    {
      id: "2",
      type: "negative",
      title: "Mc'Donalds",
      amount: "R$ 59,00",
      date: "13/06/2020",
      category: { name: "Alimentação", icon: "coffee" },
    },
    {
      id: "3",
      type: "negative",
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      date: "13/09/2020",
      category: { name: "Casa", icon: "shopping-bag" },
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/36307840?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Naldo</UserName>
            </User>
          </UserInfo>
          <LogoutButton
            onPress={() => {
              console.log("logout");
            }}
          >
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlighCards horizontal showsHorizontalScrollIndicator={false}>
        <HighlighCard
          title="Entrada"
          amount="R$ 17.400,00"
          lastTransaction="Ultima entrada dia 13 de abril"
          type="up"
        />
        <HighlighCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Ultima saída dia 03 de abril"
          type="down"
        />
        <HighlighCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </HighlighCards>
      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Transactions>
    </Container>
  );
}
