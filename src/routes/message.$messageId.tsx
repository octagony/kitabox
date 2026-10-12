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
import { MailLoader } from "#/components/MailLoader";

export const Route = createFileRoute('/message/$messageId')({
  component: MessageDetailRoute,
});

function MessageDetailRoute() {
  const { messageId } = Route.useParams();
  const navigate = Route.useNavigate();

  const { data: message, isLoading, isError } = useMessage(messageId);

  if (isLoading) {
    return (
      <Container size="md" py="xl" ta="center" pt={96} pb={76}>
        <MailLoader />
      </Container>
    );
  }

  if (isError || !message) {
    return (
      <Container size="md" py="xl" pt={96} pb={76}>
        <Button
          variant="subtle"
          onClick={() => navigate({ to: '/' })}
          leftSection={<CircleChevronLeft />}
        >
          Back to list
        </Button>
        <Paper withBorder p="xl" mt="md" ta="center">
          <Text c="red">Couldn't load message</Text>
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
        Back to list
      </Button>

      <Paper withBorder p="xl" radius="md" shadow="sm">
        <Stack gap="md">
          <Stack gap={4}>
            <Title order={3}>{message.subject || '(Без темы)'}</Title>
            <Text size="sm" c="dimmed">
              From: <Text component="span" fw={500}>{message.from.name || message.from.address}</Text>
            </Text>
            <Text size="sm" c="dimmed">
              To:
              <Text component="span">
                {message.to.map(t => t.address).join(', ')}
              </Text>
            </Text>
            <Text size="xs" c="dimmed">
              {new Date(message.createdAt).toLocaleString('ru-RU')}
            </Text>
          </Stack>

          <Divider />

          {message.html.length > 0 ? (
            <div
              dangerouslySetInnerHTML={{ __html: message.html[0] }}
              style={{
                lineHeight: 1.6,
                wordBreak: 'break-word',
                maxWidth: '100%',
                overflowX: 'auto'
              }}
            />
          ) : (
            <Text style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {message.text || '(Empty mail)'}
            </Text>
          )}
        </Stack>
      </Paper>
    </Container >
  );
}