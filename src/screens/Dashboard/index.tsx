import React, { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";

import { useTheme } from "styled-components";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { HighlighCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

import {
  Container,
  LoadingContainer,
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
  // Title,
  TransactionList,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();

  const getLastTransactionDate = (
    collection: DataListProps[],
    type: "positive" | "negative"
  ) => {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      "pt-BR",
      { month: "long" }
    )}`;
  };

  const dataKey = "gofinances:transactions";

  const loadTransactions = async () => {
    const response = await AsyncStorage.getItem(dataKey);

    if (!response) {
      return setIsLoading(false);
    }

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensesTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensesTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(item.date));

        return {
          ...item,
          amount,
          date,
        };
      }
    );

    const total = entriesTotal - expensesTotal;

    setTransactions(transactionsFormatted);

    const lastTransactionsEntries = getLastTransactionDate(
      transactions,
      "positive"
    );
    const lastTransactionsExpenses = getLastTransactionDate(
      transactions,
      "negative"
    );
    const totalInterval = `01 a ${lastTransactionsExpenses}`;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia ${lastTransactionsEntries}`,
      },
      expenses: {
        amount: expensesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia ${lastTransactionsExpenses}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  };

  const removeData = async () => {
    await AsyncStorage.removeItem(dataKey);
  };

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadingContainer>
      ) : (
        <>
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
              type="up"
              title="Entradas"
              amount={highlightData?.entries?.amount}
              lastTransaction={highlightData?.entries?.lastTransaction}
            />
            <HighlighCard
              type="down"
              title="Saídas"
              amount={highlightData?.expenses?.amount}
              lastTransaction={highlightData?.expenses?.lastTransaction}
            />
            <HighlighCard
              type="total"
              title="Total"
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData?.total?.lastTransaction}
            />
          </HighlighCards>
          <Transactions>
            {/* <Title>Listagem</Title> */}
            <TransactionList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
              showsVerticalScrollIndicator={false}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
