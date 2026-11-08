import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Workflow } from '@/components/ui/Workflow';
import { VitraWaitlist } from '@/components/motionsites/VitraWaitlist';
import { CinematicFilmAuth } from '@/components/motionsites/CinematicFilmAuth';
import { ResponsiveLanding } from '@/features/responsive/ResponsiveLanding';
describe('interactive demo flows', () => {
  it('runs the selected event and resets when its trigger changes', async () => {
    render(<Workflow />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('button', { name: 'Run a sample event' }));
    await waitFor(
      () => expect(screen.getByRole('status')).toHaveTextContent('New purchase processed'),
      { timeout: 2000 },
    );
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '0' } });
    expect(screen.getByRole('button', { name: 'Run a sample event' })).toBeInTheDocument();
  });
  it('treats a rejected callback as an error, not a successful subscription', async () => {
    const submit = vi.fn().mockResolvedValue(false);
    render(<VitraWaitlist onJoinWaitlist={submit} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'preview@example.com' },
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Join Waitlist' }).closest('form')!);
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(submit).toHaveBeenCalledWith('preview@example.com');
  });
  it('announces a local preview without claiming a real submission', async () => {
    render(<VitraWaitlist />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email address' }), {
      target: { value: 'preview@example.com' },
    });
    fireEvent.submit(screen.getByRole('button', { name: 'Join Waitlist' }).closest('form')!);
    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent('No email was submitted'),
    );
  });
  it('starts authentication fields empty and disables unconnected social providers', () => {
    render(<CinematicFilmAuth showBokehAnimation={false} />);
    expect(screen.getByLabelText('Email address')).toHaveValue('');
    expect(screen.getByLabelText('Password')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Google' })).toBeDisabled();
  });
  it('finishes onboarding and creates, completes, and removes a priority', () => {
    localStorage.clear();
    render(<ResponsiveLanding />);
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Begin' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Add a priority' }), {
      target: { value: 'Take a walk' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add priority' }));
    fireEvent.click(screen.getByRole('button', { name: 'Mark Take a walk complete' }));
    expect(screen.getByRole('button', { name: 'Mark Take a walk incomplete' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Remove Take a walk' }));
    expect(screen.getByText('An open page. Add your first priority.')).toBeInTheDocument();
  });
});
