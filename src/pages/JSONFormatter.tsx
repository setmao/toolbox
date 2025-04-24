import { useState, useEffect, useCallback } from 'react';
import { Box, Button, TextField, Card, CardContent, Grid, Typography, List, ListItem } from '@mui/material';
import { JsonView } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

export default function JSONFormatterPage() {
  const [rawData, setRawData] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [formatError, setFormatError] = useState('');
  const [searchKey, setSearchKey] = useState('');
  const [matchedPaths, setMatchedPaths] = useState<string[]>([]);

  const handleFormat = () => {
    if (!rawData.trim()) {
      setFormatError('Raw data cannot be empty.');
      setJsonData(null);
      return;
    }
    try {
      const parsed = JSON.parse(rawData);
      if (typeof parsed !== 'object' || parsed === null) {
        setFormatError('Parsed data is not a valid JSON object.');
        setJsonData(null);
        return;
      }
      setJsonData(parsed);
      setFormatError('');
    } catch (err) {
      if (err instanceof Error) {
        setFormatError(`Invalid JSON: ${err.message}`);
      }
      setJsonData(null);
    }
  };

  type JSON = null | string | number | boolean | JSON[] | Record<string, JSON>;

  interface KeyPath {
    path: string[];
    isArrayPath: boolean[];
  }

  const findPaths = useCallback((
    obj: JSON,
    key: string,
    currentPath: string[] = [],
    isArrayFlags: boolean[] = []
  ): KeyPath[] => {

    if (typeof obj !== 'object' || obj === null) return [];

    const result: KeyPath[] = [];

    const isArray = Array.isArray(obj);

    const entries: [string, unknown][] = isArray
      ? (obj as unknown[]).map((v, i) => [String(i), v])
      : Object.entries(obj as Record<string, unknown>);

    for (const [k, value] of entries) {
      const nextPath = [...currentPath, k];
      const nextFlags = [...isArrayFlags, isArray];
      if (k === key) {
        result.push({ path: nextPath, isArrayPath: nextFlags });
      }
      result.push(...findPaths(value as JSON, key, nextPath, nextFlags));
    }
    return result;
  }, []);

  const normalizeArrayPaths = useCallback((paths: KeyPath[]): string[] => {
    const set = new Set<string>();

    for (const { path, isArrayPath } of paths) {
      const segments = path.map((seg, i) => {
        return isArrayPath[i] ? '[*]' : `["${seg}"]`;
      });
      set.add(segments.join(''));
    }

    return Array.from(set);
  }, []);

  useEffect(() => {
    if (searchKey && jsonData) {
      const found = findPaths(jsonData, searchKey);
      setMatchedPaths(normalizeArrayPaths(found));
    } else {
      setMatchedPaths([]);
    }
  }, [searchKey, jsonData, findPaths, normalizeArrayPaths]);

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3} alignItems="stretch">
        <Grid size={{ xs: 12, md: 5 }}>
          <TextField
            label="Raw JSON Data"
            fullWidth
            multiline
            minRows={21}
            maxRows={21}
            value={rawData}
            onChange={(e) => setRawData(e.target.value)}
            error={!!formatError}
            helperText={formatError || ''}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 2 }} display="flex" justifyContent="center" alignItems="center">
          <Box>
            <Button variant="contained" color="primary" onClick={handleFormat}>
              Format →
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" gutterBottom>
                Formatted JSON
              </Typography>
              <Box sx={{ flex: 1, overflowY: 'auto', maxHeight: 435 }}>
                {jsonData && <JsonView data={jsonData} />}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box>
            <TextField
              label="Search key"
              fullWidth
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }} />
        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardContent sx={{ maxHeight: 170, overflowY: 'auto' }}>
              <Typography variant="h6" gutterBottom>
                Matched paths
              </Typography>
              <List>
                {matchedPaths.map((p, i) => (
                  <ListItem key={i}>{p}</ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}