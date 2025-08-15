import { ExtractedTaskArraySchema } from '@core/task.schema';

describe('LLM output validation', () => {
  it('validates a correct payload', () => {
    const payload = [
      {
        title: 'Finish assignment',
        description: 'Complete system design',
        dueAt: null,
        project: null,
      },
    ];
    const res = ExtractedTaskArraySchema.safeParse(payload);
    expect(res.success).toBe(true);
  });

  it('rejects invalid payload', () => {
    const payload = [{ wrong: 'key' }];
    const res = ExtractedTaskArraySchema.safeParse(payload);
    expect(res.success).toBe(false);
  });
});
