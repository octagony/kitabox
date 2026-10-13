import { createFileRoute } from '@tanstack/react-router';
import {
  Container,
  Paper,
  Stack,
  Text,
  Button,
  Divider,
  Title,
} from '@mantine/core';
import { useMessage } from '@/hooks/useMailRequest';
import { CircleChevronLeft } from "lucide-react";
import { MailLoader } from "@/components/MailLoader";
import { useEffect, useState } from "react";
import { cleanHTML } from "@/utils/helpers";
import classes from "@/styles/messageId.module.css";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute('/message/$messageId')({
  component: MessageDetailRoute,
});

function MessageDetailRoute() {
  const { messageId } = Route.useParams();
  const [html, setHtml] = useState<string | null>();
  const { data: message, isLoading, isError } = useMessage(messageId);
  const navigate = Route.useNavigate();
  const { t, i18n } = useTranslation();
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const clearedHTML = cleanHTML(message);
    setHtml(clearedHTML);
  }, []);

  useEffect(() => {
    if (message?.createdAt) {
      setFormattedDate(new Date(message.createdAt).toLocaleString(i18n.language));
    }
  }, [i18n.language, message?.createdAt]);

  if (isLoading) {
    return (
      <Container
        size="md"
        py="xl"
        ta="center"
        pt={96}
        pb={76}
      >
        <MailLoader />
      </Container>
    );
  }

  if (isError || !message) {
    return (
      <Container
        size="md"
        py="xl"
        pt={96}
        pb={76}
      >
        <Button
          variant="subtle"
          onClick={() => navigate({ to: '/' })}
          leftSection={<CircleChevronLeft />}
        >
          {t('message_page_back_to_list')}
        </Button>
        <Paper
          withBorder
          p="xl"
          mt="md"
          ta="center"
        >
          <Text c="red">
            {t('message_page_couldnt_load_message')}
          </Text>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="xl" py="xl" pt={96} pb={76}>
      <Button
        variant="subtle"
        onClick={() => navigate({ to: '/' })}
        mb="md"
        leftSection={<CircleChevronLeft />}
      >
        {t('message_page_back_to_list')}
      </Button>

      <Paper
        withBorder
        p="xl"
        radius="md"
        shadow="sm"
      >
        <Stack gap="md">
          <Stack gap={4}>
            <Title order={3}>
              {
                message.subject || t('message_page_no_subject')
              }
            </Title>
            <Text
              size="sm"
              c="dimmed"
            >
              {t('message_page_from')}:
              <Text
                component="span"
                fw={500}
              >
                {message.from.name || message.from.address}
              </Text>
            </Text>
            <Text
              size="sm"
              c="dimmed"
            >
              {t('message_page_to')}:
              <Text component="span">
                {
                  message.to.map(temp => temp.address).join(', ')
                }
              </Text>
            </Text>
            <Text
              size="xs"
              c="dimmed"
              key={i18n.language}
            >
              {formattedDate}
            </Text>
          </Stack>

          <Divider />

          {html ? (
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              className={classes.emailContent}
              style={{
                lineHeight: 1.6,
                wordBreak: 'break-word',
                maxWidth: '100%',
                overflowX: 'auto',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                color: 'inherit',
              }}
            />
          ) : (
            <Text
              style={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6
              }}
            >
              {message.text || t('message_page_empty_mail')}
            </Text>
          )}
        </Stack>
      </Paper>
    </Container >
  );
}