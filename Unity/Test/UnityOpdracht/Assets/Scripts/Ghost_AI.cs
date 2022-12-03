using System.Collections;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Diagnostics;
using System.Net.NetworkInformation;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Threading;
using UnityEngine;

public class Ghost_AI : MonoBehaviour
{
    public float speed;
    public Transform groundDetection;
    public Animator animator;

    private bool movingRight = true;
    private float startingTime = 3f;

    void Update()
    {
        startingTime -= 1 * Time.deltaTime;

        if(startingTime <= 0)
        {
            StartCoroutine(ToggleVisibility());
            startingTime = 3f;
        }

        transform.Translate(Vector2.right * speed * Time.deltaTime);

        RaycastHit2D groundInfo = Physics2D.Raycast(groundDetection.position, Vector2.down, 1f);
        if(groundInfo.collider == false)
        {
            if(movingRight == true)
            {
                transform.eulerAngles = new Vector3(0, -180, 0);
                movingRight = false;
            } else
            {
                transform.eulerAngles = new Vector3(0, 0, 0);
                movingRight = true;
            }
        }
    }

    private IEnumerator ToggleVisibility()
    {
        Renderer rend = gameObject.GetComponent<Renderer>();

        if(rend.enabled)
        {
            animator.Play("Ghost_disappear_animation");
            yield return new WaitForSeconds(1);
            rend.enabled = false;
        } else
        {
            rend.enabled = true;
            animator.Play("Ghost_appear_animation");
            yield return new WaitForSeconds(1);
            animator.Play("Ghost_idle_animation");
        }
    }
}
