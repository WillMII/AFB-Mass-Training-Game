using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class SelectedD : MonoBehaviour
{


    public TMP_Text text;
    public bool correct;
    private TMP_Text counter;
    public Canvas correctCanvas;
    public GameObject next;
    private bool alreadyInstantiated = false;
    private bool alreadyClicked;
    // Start is called before the first frame update
    void Start()
    {
        counter = correctCanvas.GetComponentInChildren<TMP_Text>();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void OnClick()
    {
        text.text = "D";
        if (text.gameObject.name == "Answer 1") 
        {
            correct = true;
            Debug.Log("Correct");
        }
        if (correct == true)
        {
            counter.text = (int.Parse(counter.text) + 1).ToString();
        }
        Instantiate(next.gameObject);
        next.gameObject.SetActive(true);
    }
}
